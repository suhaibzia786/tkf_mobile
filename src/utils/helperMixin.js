export const helperMixin = {
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        formatDate(date) {
            const formattedDate = new Date(date);
            const year = formattedDate.getFullYear();
            const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
            const day = formattedDate.getDate().toString().padStart(2, '0');
            const hours = formattedDate.getHours().toString().padStart(2, '0');
            const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
            const seconds = formattedDate.getSeconds().toString().padStart(2, '0');

            return `${day}-${month}-${year}`;
        },
        createSlug(data) {
            // return `${data.user_id}-${data.district}-${data.town_taluqa}-${data.}`
        },
        isTimestampToday(timestamp) {
            const today = new Date();
            const dateFromTimestamp = new Date(timestamp * 1000); // Convert timestamp to milliseconds

            return (
                dateFromTimestamp.getFullYear() === today.getFullYear() &&
                dateFromTimestamp.getMonth() === today.getMonth() &&
                dateFromTimestamp.getDate() === today.getDate()
            );
        }
    }
}
