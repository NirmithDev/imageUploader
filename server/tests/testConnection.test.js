const db = require('./db')
const addImage = require('../controller/controller')
const imagesc = require('../model/schema')
const { response, request } = require('express')
beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

describe('Added to DB',()=>{
    it('First function',async done=>{
        var files = [
            {
                fieldname: 'images',
                originalname: 'Goat1.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: 'C:\\Users\\nirmi\\AppData\\Local\\Temp',
                filename: 'Goat1-1653037991351.png',
                path: 'C:\\Users\\nirmi\\AppData\\Local\\Temp\\Goat1-1653037991351.png',
                size: 557604
              }
        ]
        var req = {files}
        request.files = files

        const {image} =await addImage.uploads(request,response)
        console.log(image)
        const images = await imagesc.find(image)
        console.log(images)
        expect(images.filename).toEqual("Goat1-1653037991351.png"+Date.now())
        expect(images.originalname).toEqual("Goat1.png")
        done()
    })
})