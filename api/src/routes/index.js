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
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${APIKEY}`)
    const apiInfo = await apiUrl.data.map(info => {
        return {
            id: info.id,
            name: info.name,
            height: info.height.metric + ' Cm',
            weight: info.weight.metric + ' Kg',
            life_span: info.life_span
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

//funcion para los temperamentos
const getAllTemperaments = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${APIKEY}`)
    const apiInfo = await apiUrl.data.map(info => {
        return {
            temperament: info.temperament
        }
    })
    return apiInfo
}


//rutas de dogs y dogs query
router.get('/dogs', async (req, res) => {
    const nameQuery = req.query.name
    const allDogs = await getAllInfo();
    if(nameQuery){
        const dogName = await allDogs.filter( dog => dog.name.toLowerCase().includes(nameQuery.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send('No esta el nombre')
    }else {
        res.status(200).send(allDogs)
    }
})

//ruta de dogs params
router.get('/dogs/:dog', async (req, res) => {
    const nameParams = req.params.dog
    const allDogs = await getAllInfo();
    if(nameParams){
        const dogName = await allDogs.filter( dog => dog.name.toLowerCase().includes(nameParams.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send('No esta el nombre')
    }else {
        res.status(200).send(allDogs)
    }
})



//ruta de temperaments
router.get('/temperament', async (req,res) => {
    const temps = await getAllTemperaments();
    let allTemps = []
    let temperamentsArray = await temps.map((temp) => {
      let temperaments = temp.temperament;
      if (temperaments) {
        temperaments = temperaments.split(", ");
      }
      return temperaments;
    });
    for(let i = 0; i < temperamentsArray.length; i++){
      allTemps = allTemps.concat(temperamentsArray[i])
   }
//    allTemps.forEach(temp => {
//        Temperament.findOrCreate({
//            where: {temperament: allTemps}
//        })
//    })
for(let h = 0; h < allTemps.length - 1; h++){
   if(allTemps[h] != null){ 
    let aux = allTemps[h]
    Temperament.findOrCreate({
               where: {temperament: aux}
         })
    }
}
// Temperament.findOrCreate({
//               where: {temperament: "test"}
//          })

const allTemps2 = await Temperament.findAll();

    res.status(200).send(allTemps2)
})




module.exports = router;
