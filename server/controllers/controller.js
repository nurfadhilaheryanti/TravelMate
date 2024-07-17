require("dotenv").config();
const express = require("express");
const axios = require("axios");
const { VertexAI } = require("@google-cloud/vertexai");
const { Trip } = require('../models')

function calculateDays(startDate, endDate) {
  // Implement your logic to calculate days between dates
  // For example:
  const start = new Date(startDate);
  const end = new Date(endDate);
  const differenceInTime = end.getTime() - start.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return Math.round(differenceInDays);
}

class Controller {
  static async handleRecommendation(req, res, next) {
    try {
      const vertexAI = new VertexAI({
        project: process.env.GCLOUD_PROJECT,
        location: "us-central1",
      });
  
      const generativeModel = vertexAI.getGenerativeModel({
        model: "gemini-1.5-pro-001",
      });
  
      const { destination, startDate, endDate, maxPrice, tripName } = req.body;
  
      const prompt = `
        Please give me recommendation for travelling in ${destination} for cultural immersion with ${maxPrice} IDR budget for ${calculateDays(startDate, endDate)} days and i love history in 2024, give me the exact name of the place, not the event. Make the first data appeared is a hotel you recommend. Send your result in format of an array in JSON. Please give the coordinates too. Please don't give any other response othen than array in JSON
    
        give with this kind of format:
          {
            "name": ,
            "description": ,
            "coordinates": {
              "latitude": ,
              "longitude": 
            }
          }
      `;
  
      const resp = await generativeModel.generateContent(prompt);
      const contentResponse = resp.response;
      const data = contentResponse.candidates[0].content.parts[0].text;
      const replace = data.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      const parsedData = JSON.parse(replace);
          
      // parsedData.push(tripName)
      // Add tripName to parsedData
      const responseWithTripName = {
        tripName,
        parsedData
      };
  
      res.json(responseWithTripName); // iniiiiii
    } catch (error) {
      next(error) 
    }
  }

  
 static async saveTrip(req, res, next){
  try {
    // const id = localStorage.user_id
    const { tripName, locations, id } = req.body
    console.log(req.body);
   
    const data = await Trip.create({tripName, locations, userId: id})

    res.status(201).json({
      message: 'success save trip',
      data
    })
  } catch (error) {
    next(error) 
  }
 }

static async readMyTrip(req, res, next){
  try {
    // console.log(req.loginInfo, '<<<');
    const data = await Trip.findAll({
      where: {
        userId: req.loginInfo.id
      }
    })
    res.status(200).json({
      data
    })

  } catch (error) {
    next(error) 
  }
}

static async deleteTrip(req, res, next){
  try {
    
  } catch (error) {
    next(error)
  }
}

}

module.exports = Controller;
