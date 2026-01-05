const  csvService = require('../service/csv.service')

const validateCsv = async (req, res) =>{
      try {
    if (!req.file) {
      return res.status(400).send('Please upload a file');
    }
    
    const fileBuffer = req.file.buffer;
    
   
 const requiredHeaders = ['ID', 'Year', 'Date', 'Stage', 'Home Team', 'Away Team', 'Host Team'];

    
    const result = await csvService.processCsv(fileBuffer, requiredHeaders);
    console.log(requiredHeaders)
    res.send(result);

    
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
};





module.exports = {
        validateCsv
}