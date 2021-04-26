export const getAllProducts = async () => {
    return stubData;
};

export const getProductById = async (productId: string) => {
    return stubData.find(({ id }) => id === productId);
};


const stubData = [];