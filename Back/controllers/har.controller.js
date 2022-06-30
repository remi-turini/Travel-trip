const models = require("../models")
const axios = require("axios");

async function allByCity(req, res)
{
    const cityName = req.body.cityName ?? null;
    const keyWord = req.body.keyWord ?? null;


    var cities = await models.Airport.findAll({
        where: {cityName: cityName},
        attributes: ['name', 'cityName', 'countryName', 'lat', 'lon']
    });

    if (cities.length === 0){
        return res.status(404).json({
            state: "error",
            message: "Aucune information disponible dans la ville : " + cityName,
            data: null
        });
    }

    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ cities[0].lat +","+ cities[0].lon +"&radius=15000&type=&keyword="+ keyWord +"&key=AIzaSyDUpndmhQqRkr2EAy_2ZVbh5irpHXP0tFY"

    try {
        var multipleResult = await axios({
            url: url,
            method: 'get',
        });
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            state: "error location request",
            message: "Une erreur interne est survenue",
            data: e
        });
    }

    if(multipleResult.data.status !== "OK")
    {
        return res.status(404).json({
            "state": "error location request",
            "message": "Une erreur interne est survenue",
            "data": multipleResult.data
        });
    }

    var datas = [];
    var index = 0;
    for (const result of multipleResult.data.results)
    {
        var data = {};
        if (typeof result.name !== "undefined")
        {
            data.name = result.name;
        }

        // if(typeof result.photos !== "undefined"  && result.photos.length !== 0 && typeof result.photos.photo_reference !== "undefined")
        // {
        try {
            var photoPlaceUrl = "https://maps.googleapis.com/maps/api/place/photo?photo_reference="+ result.photos[0].photo_reference +"&key=AIzaSyDUpndmhQqRkr2EAy_2ZVbh5irpHXP0tFY&maxwidth=400"

            var photoPlace = await axios({
                url: photoPlaceUrl,
                method: 'get',
            });

            data.photo = photoPlace.request._redirectable._currentUrl;
        } catch (e) {
            console.log(e);
        }
        // }
        datas.push(data);
        index++;
    }
    // return res.setHeader("Content-Type", 'image/jpeg').setHeader('Content-Disposition', 'inline;filename="unnamed.jpg"').json(datas[0].photo);

    return res.status(200).json({
        state: "ok",
        message: null,
        data: datas
    });
}

module.exports = {
    allByCity: allByCity,
}