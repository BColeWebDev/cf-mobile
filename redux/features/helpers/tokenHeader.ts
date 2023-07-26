const tokenBearer = (token) =>{
    const config = {
        headers: { bearer: `${token}` }
    };
    return config
}

export default tokenBearer