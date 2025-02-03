//*===============================>>Swagger API <<===============================
//? what is a swagger ? 
// Swagger is an API documentation tool that helps developers describe, design, and document RESTful APIs.  
// It provides an interactive interface where users can test API endpoints directly from the documentation.  
// Benefits:  
// - Generates clear API documentation.  
// - Enables direct API testing.  
// - Improves team collaboration.  
// - Supports code generation.  
// - Ensures API consistency.  
//* to use swagger first thing you should install (npm i swagger-ui-express)
//* then create file in root with name  (swagger.json)
//! inside swagger.json => you will write what you want to shown in the swagger documentation لكن يجب عليك ان تضمن ما يلي
/* بشكل مختصر 
✅  info لتعريف المعلومات الأساسية استخدم 
✅  servers للسيرفرات المختلفة حدد
✅  paths للمسارات المطلوبة أضف
✅  components.schemas لتعريف البيانات استخدم
✅  security إذا احتجت إلى مصادقة قم بإضافة
*/
// now when you run this file and go to the path localhost:3000/api-docs will see page of swagger with information 
// that we write it inside swagger.json file 
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// now if you try the to get audits form swagger will give you correct result 