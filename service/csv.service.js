const csv = require('csv-parser')
const { Readable} = require('stream');

//this will check the no. of rows pressent also will * file...






const processCsv = (fileBuffer, requiredHeaders) =>{
        return new Promise((resolve, reject) =>{
                let rowCount = 0;

                let isfirstRow = true;

                const stream = Readable.from(fileBuffer);
              stream
           .pipe(csv())
           .on('data', (row) => {

              if(isfirstRow){
                const csvHeaders = Object.keys(row)
                console.log('CSV Headers:', csvHeaders);
          console.log('Required Headers:', requiredHeaders);

              let i=0;
              while(i< requiredHeaders.length){
                const needed = requiredHeaders[i];


                if(!csvHeaders.includes(needed)){         //must check if header is in CsvHeaders..
                        stream.destroy();

                        return reject(new Error(`Header "${needed}" is missing`))
                }
                i++;
              }
           console.log('All Headers present')
           isfirstRow = false;
        }

        //      rowCount++;
        //     console.log('Row:', row); 
       })
      .on('end', () => {
        // resolve(`Total rows: ${rowCount}`);
         resolve('Headers validated successfully!');
       })
      .on('error', reject);
        })
        }

        module.exports = {
                processCsv
        }
