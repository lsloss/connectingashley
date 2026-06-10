import { DivIcon } from 'leaflet';

export function createPinSystem() {
    const iconCache = new Map();

    const categoryConfig = {
        communityHubsAndProjects: {
            hue: 5,
            symbol: 'communityHubsAndProjects'
        },
        ecoProjects: {
            hue: 140,
            symbol: 'ecoProjects'
        },
        facility: {
            hue: 220,
            symbol: 'facility'
        },
        health: {
            hue: 320,
            symbol: 'health'
        },
        historyAndCulture: {
            hue: 35,
            symbol: 'historyAndCulture'
        },
        natureAndGreenSpaces: {
            hue: 90,
            symbol: 'natureAndGreenSpaces'
        },
        transport: {
            hue: 270,
            symbol: 'transport'
        }
    };

    function createIcon(category, subcategoryIndex) {
        const config = categoryConfig[category];

        const color = `hsl(
            ${config.hue}
            75%
            ${getLightness(subcategoryIndex)}%
        )`;

        return new DivIcon({
            className: '',
            iconSize: [36, 46],
            html: `
            <svg viewBox="0 0 63.08 76.5">
                <g id="Layer_4">
                    <circle cx="31.54" cy="31.54" r="31.54" fill="${color}"/>

                    <svg x="12" y="12" width="37" height="37">
                        <use href="#${config.symbol}" />
                    </svg>

                    <polyline points="40.55 60.79 31.68 76.5 22.8 60.79" fill="${color}"/>
                </g>
            </svg>
            `
        });
    }

    function getIcon(category, subcategory) {
        const key = `${category}:${subcategory}`;

        if (!iconCache.has(key)) {
            iconCache.set(
            key,
            createIcon(category, subcategory)
            );
        }

        return iconCache.get(key);
    }

    function getLightness(index) {
        return 35 + (index * 7);
    }

    return { getIcon };
}