const { faker } = require('@faker-js/faker');
const fakeDataModel = require('../models/fakeData.model')

module.exports.createFakeData = async (req, res) => {
    const { userId } = req // users unique id coming from jwt 

    const fakeData = await fakeDataModel.create({
        userId,
        name: faker.person.fullName(),
        userName: faker.internet.username(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        ipAddress: faker.internet.ip()
    })
    res.json({
        msg:"Data Created",
        fakeData
    })
}

module.exports.getFakeData = async (req ,res) => {
    const { userId } = req //users uniques id from jwt

    const getInfo = await fakeDataModel.find({userId:userId})
    if(!getInfo) return res.json({msg:"not found"})
    res.json({
        msg:"found",
        info: getInfo
    })
}

module.exports.deleteFakeData = async (req ,res) => {
    const { _id } = req.body    // docs unique id , coming from frontend

    const deleteInfo = await fakeDataModel.deleteOne({_id:_id})

    res.status(200).json({
        msg:"deleted succesfully"
    })
}