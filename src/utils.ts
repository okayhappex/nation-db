const verifyToken = async (token: string): Promise<object | undefined> => {
    try {
        const res = await fetch('http://localhost:4096/base/records/tokens.json');
        
        if (!res.ok) console.error('Network response was not ok');

        const data = await res.json();
        console.log(data)

        if (data[token]) {
            console.log(data[token])
            return data[token];
        } else {
            console.log("Token not found");
            return undefined;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return undefined;
    }
};

export { verifyToken };