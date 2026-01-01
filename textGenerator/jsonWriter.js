import fs from 'fs';
function read(filePath){
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    const jsonData = JSON.parse(data);
    return jsonData;
});
}
function write(filePath,text){
    fs.readFile(filePath, 'utf-8', (err, data) => {
      
      if (err) {
          console.error("Error reading file:", err);
          return;
      }
      const jsonData = JSON.parse(data);
      let d = jsonData;
      let temp = text;
      d.push(temp);
      d = JSON.stringify(d);

      fs.writeFile('a.json' , d , (err , data) =>{
        if(err){
          console.log(err);
        }
      })

      console.log(jsonData);
  });
  }
export {read,write}