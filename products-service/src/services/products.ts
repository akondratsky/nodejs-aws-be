export const getAllProducts = async () => {
    return stubData;
};

export const getProductById = async (productId: string) => {
    return stubData.find(({ id }) => id === productId);
};


const stubData = [
    {
        count : 4,
        description: "The kazoo is an American musical instrument that adds a \"buzzing\" timbral quality to a player's voice when the player vocalizes into it.",
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        price: 2.4,
        title: "Kazoo"
    },
    {
        count : 6,
        description: "When you need to signal that dinner is ready, train pets, call order in a room, use in games or for a person to call for help, this silver tea bell is the answer",
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
        price: 5.99,
        title: "Hand bell"
    },
    {
        count : 7,
        description: "Loud and clear: the gong is suitable for various events, and by hitting the gong, users can feel power and strength",
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
        price: 49.99,
        title: "Gong"
    },
    {
        count : 12,
        description: "This high-quality handcrafted meditation bowl set includes a wooden striker and hand sewn cushion",
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
        price: 24.97,
        title: "Tibetan Singing Bowl Set"
    },
    {
        count : 7,
        description: "Makes loud, fat and sexy noise, filled with life",
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
        price: 23,
        title: "Didgeridoo"
    },

    {
        count : 8,
        description: "With jingle bells you can become a god of percussion by the power of New Year",
        id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
        price: 15,
        title: "Jingle bells"
    },
    {
        count : 2,
        description: "This ancient and beauty bottle is ideal to whistle. \"I love to whistle with bottle after hard work\" /Alex Key, front-end developer/",
        id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
        price: 300,
        title: "Bottle"
    },
    {
        count : 3,
        description: "Features a bold, crisp sound that requires less breath than traditional pealess whistles",
        id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
        price: 6.72,
        title: "Sport whistle"
    }
];