const { where } = require("sequelize");
const { Pokemon, Type } = require("../../db");



module.exports = async (req, res) => {
    const { name, base_hp, base_attack, base_defense, base_speed, height, weight, types } = req.body
    const pokeApiCount = 1025
    const pokeDbCount = await Pokemon.findAll();

    try {
        const [ poke, created ] = await Pokemon.findOrCreate({
            where: { name: name },
            defaults: {
                id: (pokeApiCount -1) + (pokeDbCount.length + 1),
                image: "https://henryjimenezp.github.io/P4-Pokedex/img/pokemon.png",
                imageAnimated: "https://henryjimenezp.github.io/P4-Pokedex/img/pokemon.png",
                base_hp,
                base_attack,
                base_defense,
                base_speed,
                height,
                weight
            },
            include: [ {
                model: Type,
                through: {
                    attributes: []
                }
                }]
        });

        if (types) {
            for (const typeInfo of types) {
                const type = await Type.findOne({ where: { name: typeInfo.name } })
                await poke.addType(type)
            }
        }

        if (!created) {
            return res.status(200).json([ { message: "Pokemon existe en la Pokedex :O", data: poke } ]);
        }

        return res.status(200).json([ { message: "Pokemon creado ;)", data: poke } ]);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}