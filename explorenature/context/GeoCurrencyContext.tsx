import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface GeoCurrencyState {
	countryCode: string | null;
	countryName: string | null;
	cityName: string | null;
	currency: string; // ISO 4217 like USD, EUR, BDT
	phoneDisplay: string | null;
	formatPrice: (amount: number) => string;
}

const DEFAULT_COUNTRY = 'BD';
const DEFAULT_NAME = 'Bangladesh';
const DEFAULT_CITY = 'Dhaka';
const DEFAULT_CURRENCY = 'BDT';
const DEFAULT_PHONE = '+8801704439665';

const countryToCurrency: Record<string, string> = {
	US: 'USD',
	GB: 'GBP',
	EU: 'EUR',
	CA: 'CAD',
	AU: 'AUD',
	IN: 'INR',
	BD: 'BDT',
	AE: 'AED',
	SA: 'SAR',
	SG: 'SGD',
	JP: 'JPY',
};

const countryNames: Record<string, string> = {
	US: 'United States',
	GB: 'United Kingdom',
	EU: 'European Union',
	CA: 'Canada',
	AU: 'Australia',
	IN: 'India',
	BD: 'Bangladesh',
	AE: 'United Arab Emirates',
	SA: 'Saudi Arabia',
	SG: 'Singapore',
	JP: 'Japan',
};

const GeoCurrencyContext = createContext<GeoCurrencyState | undefined>(undefined);

export const GeoCurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [countryCode, setCountryCode] = useState<string | null>(null);
	const [cityName, setCityName] = useState<string | null>(null);

	// Client-side detection using Intl and navigator
	useEffect(() => {
		try {
			const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
			
			// Detect city from timezone
			if (tz.includes('Dhaka')) {
				setCityName('Dhaka');
			} else if (tz.includes('Sylhet')) {
				setCityName('Sylhet');
			} else if (tz.includes('Chittagong')) {
				setCityName('Chittagong');
			} else if (tz.includes('Rajshahi')) {
				setCityName('Rajshahi');
			} else if (tz.includes('Khulna')) {
				setCityName('Khulna');
			} else if (tz.includes('Barisal')) {
				setCityName('Barisal');
			} else if (tz.includes('Rangpur')) {
				setCityName('Rangpur');
			} else {
				setCityName(DEFAULT_CITY);
			}
			
			// Always set Bangladesh
			setCountryCode(DEFAULT_COUNTRY);
		} catch (e) {
			// Fallback
			setCountryCode(DEFAULT_COUNTRY);
			setCityName(DEFAULT_CITY);
		}
	}, []);

	const currency = useMemo(() => {
		const cc = countryCode ?? DEFAULT_COUNTRY;
		return countryToCurrency[cc] ?? DEFAULT_CURRENCY;
	}, [countryCode]);

	const countryName = useMemo(() => {
		const cc = countryCode ?? DEFAULT_COUNTRY;
		return countryNames[cc] ?? DEFAULT_NAME;
	}, [countryCode]);

	const phoneDisplay = useMemo(() => {
		// You can expand this map to show different sales numbers per region
		return DEFAULT_PHONE;
	}, []);

	const formatPrice = useMemo(() => {
		return (amount: number) => {
			try {
				return new Intl.NumberFormat(undefined, {
					style: 'currency',
					currency,
					maximumFractionDigits: 0,
				}).format(amount);
			} catch {
				return `${currency} ${amount}`;
			}
		};
	}, [currency]);

	const value: GeoCurrencyState = {
		countryCode,
		countryName,
		cityName,
		currency,
		phoneDisplay,
		formatPrice,
	};

	return <GeoCurrencyContext.Provider value={value}>{children}</GeoCurrencyContext.Provider>;
};

export const useGeoCurrency = (): GeoCurrencyState => {
	const ctx = useContext(GeoCurrencyContext);
	if (!ctx) throw new Error('useGeoCurrency must be used within GeoCurrencyProvider');
	return ctx;
};
