

export const ExportToken = (): boolean => {
    const token = localStorage.getItem("token");
    return !!token;
}


