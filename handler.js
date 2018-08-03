'use strict';

const { DateTime } = require('luxon');
const tf = require('./typeform.js')

module.exports.daySync = async (event, context, callback) => {
  var now = DateTime.local();
  var dates = []
  var j = 1;

  do{
    var d = now.plus({days: j});
    if(process.env.EXCLUDE_WEEKENDS==="true"){//exclude weekends
      if(d.weekday === 6){ //saturday
        d = d.plus({days: 2});
        j = j+ 2
      }else if(d.weekday === 7){ //sunday
        d = d.plus({days: 1});
        j = j+ 1
      }
    }
    j = j+ 1
    dates.push({label:d.toLocaleString(DateTime.DATE_HUGE)})
  }while(dates.length<process.env.INTERVAL)
  console.log("next dates", dates)

  //Get typeform form def
  const form_def = await tf.getFormDef(process.env.FORM_ID)
  //Find field
  const field = form_def.fields.find(f => f.id === process.env.FIELD_ID)
  //Replace field value
  field.properties.choices = dates

  // puts new form def
  console.log('new field payload', JSON.stringify(field))
  tf.updateForm(process.env.TF_TOKEN, process.env.FORM_ID, form_def)

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Form updated',
      input: event,
    }),
  };

  callback(null, response);
};
