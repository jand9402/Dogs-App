const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const router = Router();
const { APIKEY } = process.env;
const { Dog, Temperament } = require('../db')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



//Funciones para el GET de dogs, dogs query y dogs params
//son 3 pero solo utilizo getAllInfo que concatena las la info de la api mas la de la db
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds/?apikey=${APIKEY}`)
    const apiInfo = await apiUrl.data.map(info => {
        let temperament = info.temperament
        

        let weight = info.weight.metric
        if(weight){
            weight = weight.split(" - ")
        }else{
            weight = ["Empty"]
        }
        let minWeight = weight[0]
        let maxWeight = weight[1]



        if (temperament) {{
            temperament = temperament.split(", ");
        }
        return {
            image: info.image,
            name: info.name,
            temperament: temperament,
            minWeight: minWeight,
            maxWeight: maxWeight
        }}else{
            return {
                image: info.image,
                name: info.name,
                temperament: "#",
                minWeight: minWeight,
                maxWeight: maxWeight
        }
    }
    })
    return apiInfo
}

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['temperament'],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllInfo = async () => {
    const api = await getApiInfo();
    const db = await getDbInfo();
    const apiDb = api.concat(db);
    return apiDb
}

//?apikey=${APIKEY}

//funcion para los temperamentos
const getAllTemperaments = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds/?apikey=${APIKEY}`)
    const apiInfo = await apiUrl.data.map(info => {
        return {
            temperament: info.temperament
        }
    })
    return apiInfo
}
// const getAllTemperaments = function(){
//     fetch(`https://api.thedogapi.com/v1/breeds?apikey=${APIKEY}`)
//     .then(apiInfo => apiInfo.json())
//     .then(res => {console.log(res)})
//     .catch(err => console.log(err))
// }





//rutas de dogs y dogs+query
router.get('/dogs', async (req, res) => {
    const nameQuery = req.query.name
    const allDogs = await getAllInfo();
    if (nameQuery) {
        const dogName = await allDogs.filter(dog => dog.name.toLowerCase().includes(nameQuery.toLowerCase()))
        dogName.length ?
            res.status(200).send(dogName) :
            res.status(404).send('No esta el nombre')
    } else {
        res.status(200).send(allDogs)
    }
})

//ruta de dogs params
router.get('/dogs/:idRaza', async (req, res) => {
    const raza = req.params.idRaza
    const allDogs = await getAllInfo();
    if (raza) {
        const razaId = await allDogs.filter(dog => dog.name == raza)
        razaId.length ?
            res.status(200).json(razaId) :
            res.status(404).send('No esta la raza')
    }
})



//ruta de temperaments
router.get('/temperament', async (req, res) => {
    const temps = await getAllTemperaments();
    let allTemps = []
    let temperamentsArray = await temps.map((temp) => {
        let temperaments = temp.temperament;
        if (temperaments) {
            temperaments = temperaments.split(", ");
        }
        return temperaments;
    });
    for (let i = 0; i < temperamentsArray.length; i++) {
        allTemps = allTemps.concat(temperamentsArray[i])
    }
    //    allTemps.forEach(temp => {
    //        Temperament.findOrCreate({
    //            where: {temperament: allTemps}
    //        })
    //    })
    for (let h = 0; h < allTemps.length - 1; h++) {
        if (allTemps[h] != null) {
            let aux = allTemps[h]
            Temperament.findOrCreate({
                where: { temperament: aux }
            })
        }

    }
    // Temperament.findOrCreate({
    //               where: {temperament: "test"}
    //          })


    const allTemps2 = await Temperament.findAll();

    res.status(200).send(allTemps2)
})


router.post('/dog', async (req, res) => {
    let {
        name,
        height,
        minWeight,
        maxWeight,
        life_span,
        temperament
    } = req.body

   let newDog = await Dog.create({
        name,
        height,
        minWeight,
        maxWeight,
        life_span,
    })


    let temperamentDb = await Temperament.findAll({
        where: { temperament: temperament }
    })
    newDog.addTemperament(temperamentDb)
    res.send('todo ok')
});


module.exports = router;
