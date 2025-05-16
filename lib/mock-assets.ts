export interface Asset {
    id: string;
    description: string;
    category: 'notebook' | 'monitor' | 'headset';
}

export const mockAssets: Asset[] = [
    // Notebooks
    { id: "UNI-NB1001", description: "Notebook Dell Latitude 5420", category: "notebook" },
    { id: "UNI-NB1002", description: "Notebook Dell XPS 13", category: "notebook" },
    { id: "UNI-NB1003", description: "Notebook Lenovo ThinkPad X1", category: "notebook" },
    { id: "UNI-NB1004", description: "Notebook HP EliteBook 840", category: "notebook" },
    { id: "UNI-NB1005", description: "Notebook MacBook Pro 13", category: "notebook" },
    { id: "UNI-NB1006", description: "Notebook Acer Aspire 5", category: "notebook" },
    { id: "UNI-NB1007", description: "Notebook Asus ZenBook", category: "notebook" },
    { id: "UNI-NB1008", description: "Notebook Lenovo IdeaPad 5", category: "notebook" },
    { id: "UNI-NB1009", description: "Notebook Dell Inspiron 15", category: "notebook" },
    { id: "UNI-NB1010", description: "Notebook HP Pavilion 14", category: "notebook" },

    // Monitors
    { id: "UNI-MN2001", description: "Monitor Dell 24 P2419H", category: "monitor" },
    { id: "UNI-MN2002", description: "Monitor LG 27GL850 27", category: "monitor" },
    { id: "UNI-MN2003", description: "Monitor Samsung S24R350 24", category: "monitor" },
    { id: "UNI-MN2004", description: "Monitor AOC 24B1XHS 24", category: "monitor" },
    { id: "UNI-MN2005", description: "Monitor Phillips 272E 27", category: "monitor" },
    { id: "UNI-MN2006", description: "Monitor BenQ GW2780 27", category: "monitor" },
    { id: "UNI-MN2007", description: "Monitor Dell UltraSharp U2720Q 27", category: "monitor" },
    { id: "UNI-MN2008", description: "Monitor LG UltraGear 24GL600F 24", category: "monitor" },
    { id: "UNI-MN2009", description: "Monitor Acer KA242Y 24", category: "monitor" },
    { id: "UNI-MN2010", description: "Monitor Samsung Odyssey G5 27", category: "monitor" },

    // Headsets
    { id: "UNI-HS3001", description: "Headset Logitech H390", category: "headset" },
    { id: "UNI-HS3002", description: "Headset HyperX Cloud Stinger", category: "headset" },
    { id: "UNI-HS3003", description: "Headset Jabra Evolve 20", category: "headset" },
    { id: "UNI-HS3004", description: "Headset Corsair HS35", category: "headset" },
    { id: "UNI-HS3005", description: "Headset Microsoft LifeChat LX-3000", category: "headset" },
    { id: "UNI-HS3006", description: "Headset Plantronics Blackwire 3220", category: "headset" },
    { id: "UNI-HS3007", description: "Headset Razer Kraken X", category: "headset" },
    { id: "UNI-HS3008", description: "Headset JBL Quantum 100", category: "headset" },
    { id: "UNI-HS3009", description: "Headset SteelSeries Arctis 1", category: "headset" },
    { id: "UNI-HS3010", description: "Headset Sennheiser PC 8.2", category: "headset" }
]; 