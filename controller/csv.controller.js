const  csvService = require('../service/csv.service')
const { stringify } = require('csv-stringify');
const { pipeline } = require('stream/promises');

const validateCsv = async (req, res) =>{
      try {
    if (!req.file) {
      return res.status(400).send('Please upload a file');
    }
    
 const requiredHeaders = ['ID', 'Year', 'Date', 'Stage', 'Home Team','Home Goals', 'Away Goals', 'Away Team','Win Conditions','Host Team'];

    
   const validatedRows = await csvService.processCSV(req.file.buffer, requiredHeaders);

   

   res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=validated.csv');
    
    // Convert objects to CSV and pipe directly to response


    // validatedRows
    //   .pipe(stringify({ header: true }))
    //   .pipe(res);
       await pipeline(   //lightweight
      validatedRows,
      stringify({ header: true }),
      res
    );

// res.json({ success: true, totalRows: validatedRows.length, data: validatedRows });
           



  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
};

module.exports = {
        validateCsv
}

