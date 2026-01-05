const csv = require('csv-parser')
const { Readable} = require('stream');



const processCsv = (fileBuffer, requiredHeaders) =>{
        return new Promise((resolve, reject) =>{
                // let rowCount = 0;
                const validatedRows = [];

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


                if(!csvHeaders.includes(needed)){         //must check if header is in csvHeaders..
                        stream.destroy();

                        return reject(new Error(`Header "${needed}" is missing`))
                }
                i++;
              }
           console.log('All Headers present')
           isfirstRow = false;
        }


        //validate Rows with
        
           const remarks =[];
           let j = 0;
        
        while(j<requiredHeaders.length){
           const column = requiredHeaders[j];
           const value = row[column]; 
           
           
           if(value === null || value=== undefined || value === ''){
                remarks.push(`${column} is empty`);

           }else 
                if(value === '0' || value === 0){
                        remarks.push(`${column} is zero`)
                }
                j++;
        }                
            row.remarks = remarks.length>0 ? remarks.join('; ') : ' ';
                 validatedRows.push(row);

          if(row.remarks){
                console.log(`Row ${validatedRows.length}: ${row.remarks}`)
          }


        //      rowCount++;
        //     console.log('Row:', row); 
       })
      .on('end', () => {
        // resolve(`Total rows: ${rowCount}`);
        //  resolve('Headers validated successfully!');
         console.log(`Total rows processed: ${validatedRows.length}`);
        resolve(validatedRows);
       })
      .on('error', reject);
        })
        }

        module.exports = {
                processCsv
        }
