const csv = require('csv-parser');
const { Readable, Transform } = require('stream');


exports.processCSV = (fileBuffer, requiredHeaders) => {
  
  let isFirstRow = true;
  let rowCount = 0;
  
  // Create transform stream that processes one row at a time
  const validateStream = new Transform({
    objectMode: true,
    // highWaterMark:100,

    transform(row, encoding, callback) {
      
      if (isFirstRow) {
        const csvHeaders = Object.keys(row); 
        
        console.log('Checking headers...');
        
        let i = 0;
        while (i < requiredHeaders.length) {
          const needed = requiredHeaders[i];
          
          if (!csvHeaders.includes(needed)) {
            return callback(new Error(`Header "${needed}" is missing`));
          }   
          
          i++;
        }
    
        // console.log('Headers OK');
        isFirstRow = false;
      }
      
      // STEP 2: Validate this row
      const remarks = [];
      
      let j = 0;
      while (j < requiredHeaders.length) {
        const column = requiredHeaders[j];
      const value = row[column];

    if (value === null || value === undefined || value === '' || value === 'null' || value === 'NULL') {
      remarks.push(`${column} is empty`);
    }
      if (value === '0' || value === 0) {
      remarks.push(`${column} is zero`);
    }
    
    j++;
  }
       


      // Add remarks to row
      row.remarks = remarks.length > 0 ? remarks.join('; ') : '';
      
      rowCount++;
      // Send this row immediately (no storage!)
//       this.push(row);
//       callback(); //backpressure next row 

//for ensuring all columns
callback(null, row);
    },
    
    final(callback) {
      console.log(`Total rows processed: ${rowCount}`);
      callback();
    }
  });
  
  // Return the stream (not array!)
  const readStream = Readable.from(fileBuffer);
  return readStream.pipe(csv()).pipe(validateStream);
};




 



