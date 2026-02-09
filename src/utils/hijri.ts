
const HIJRI_MONTHS = [
    'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
    'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
];

export const formatHijriDate = (dateStr: string): string => {
    try {
        const parts = dateStr.split('-');
        if (parts.length !== 3) return dateStr;

        const year = parts[0];
        const monthIndex = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);

        if (monthIndex < 0 || monthIndex >= 12) return dateStr;

        return `${day} ${HIJRI_MONTHS[monthIndex]} ${year}`;
    } catch (e) {
        return dateStr;
    }
};
