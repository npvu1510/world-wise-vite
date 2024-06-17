import { useEffect, useState } from 'react';

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const BASE_URL = `https://api.bigdatacloud.net/data/
reverse-geocode-client?`;

function useReverseGeocode(lat, lng) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [countryName, setCountryName] = useState('');
    const [cityName, setCityName] = useState('');
    const [flag, setFlag] = useState('');

    // console.log(`run useReverseGeoCode: ${countryName} ${cityName} ${flag}`);

    useEffect(
        function () {
            const fetchCity = async function () {
                try {
                    setError('');
                    setIsLoading(true);

                    if (!lat || !lng)
                        throw new Error(
                            'Start by click any position on the map'
                        );

                    const res = await fetch(
                        `${BASE_URL}latitude=${lat}&longitude=${lng}`
                    );

                    if (!res.ok)
                        throw new Error('Something went wrong with response !');

                    const data = await res.json();

                    if (!data.countryName)
                        throw new Error(
                            `There isn't any information about ${lat}, ${lng}!`
                        );

                    setCountryName(data.countryName);
                    setCityName(data.city || data.locality || '');
                    setFlag(convertToEmoji(data.countryCode));
                } catch (err) {
                    console.log(`⚠️⚠️⚠️: ${err.message}`);
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchCity();
        },
        [lat, lng]
    );
    return {
        isLoading,
        error,
        countryName,
        setCountryName,
        cityName,
        setCityName,
        flag,
        setFlag,
    };
}

export default useReverseGeocode;
