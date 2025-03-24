export const formatDateForFrontend = (dateString: string) => {
    if (!dateString) return "";

    // Divide a string "yyyy-MM-dd"
    const [year, month, day] = dateString.split("-");

    // Retorna no formato "dd/MM/yyyy"
    return `${day}/${month}/${year}`;
};
