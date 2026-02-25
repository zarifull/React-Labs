import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CurrencyConverter: React.FC = () => {
    const [amount, setAmount] = useState<number | string>(1);
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('KGS');
    const [exchangeRate, setExchangeRate] = useState<number | null>(null);
    const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    useEffect(() => {
        const fetchRate = async () => {
            setError(null);
            try {
                const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
                if (!response.ok) throw new Error("Fetch failed");
                
                const data = await response.json();
                setExchangeRate(data.rates[toCurrency]);
            } catch (err) {
                setError("Could not update exchange rate. Please try again.");
            }
        };
        fetchRate();
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        if (exchangeRate !== null) {
            const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
            if (!isNaN(numericAmount)) {
                setConvertedAmount((numericAmount * exchangeRate).toFixed(2));
            }
        }
    }, [amount, exchangeRate]);

    return (
        <div className='container'>
            <Link to='/' style={{ color: 'white', fontWeight: 'bold' }}>← Back to home</Link>
            <div className="task-container" style={{ maxWidth: '500px', margin: '50px auto' }}>
                <h2 style={{ color: '#6c5ce7', textAlign: 'center' }}>💰 Finance Lab</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="weather-input"
                        style={{ width: '100%', fontSize: '1.5rem', textAlign: 'center' }}
                    />

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="weather-input">
                            <option value="USD">USD - Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="KGS">KGS - Som</option>
                            <option value="RUB">RUB - Ruble</option>
                        </select>

                        <button
                            onClick={swapCurrencies}
                            style={{ background: 'white', border: 'none', borderRadius: '50%', width: '45px', height: '45px', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.2)', transition: 'transform 0.2s' }}
                            onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.transform = 'rotate(180deg)'}
                            onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.transform = 'rotate(0deg)'}
                        >🔄</button>

                        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="weather-input">
                            <option value="KGS">KGS - Som</option>
                            <option value="USD">USD - Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="TRY">TRY - Lira</option>
                        </select>
                    </div>

                    {/* Error Message Display */}
                    {error && (
                        <div style={{ color: '#ff4d4d', textAlign: 'center', padding: '10px', background: 'rgba(255, 77, 77, 0.1)', borderRadius: '10px' }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {convertedAmount && !error && (
                        <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(255,255,255,0.2)', borderRadius: '15px' }}>
                            <h3 style={{ color: '#495057', margin: 0 }}>Result:</h3>
                            <h1 style={{ color: '#6c5ce7', margin: '10px 0' }}>{convertedAmount} {toCurrency}</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CurrencyConverter;