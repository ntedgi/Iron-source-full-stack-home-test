const dbHandler = require('../../services/db/PostgresHandler');

const formsTable = 'forms_data';
const submitTable = 'forms_submit';

const getForms = async() => {
  const getFormsProperties = `SELECT id,name from ${formsTable}`;
  const getFormsSubmitCount = `SELECT id,count(*) from ${submitTable} GROUP BY 1`;

  const [forms, submitCounts] = await Promise.all([
    dbHandler.executeQuery(getFormsProperties, []),
    dbHandler.executeQuery(getFormsSubmitCount, []),
  ]);
  const submitCountsMap = submitCounts.rows.reduce((acc, e) => {
    acc[e.id] = e.count;
    return acc;
  }, {});

  const result = forms.rows.map(row => {
    const { id, name } = row;
    return {
      id,
      name,
      submissions_count: submitCountsMap[id] ? submitCountsMap[id] : 0,
      submit_page_uri: `/form/submit/${id}`,
      submissions_page_uri: `/form/submissions/${id}`,
    };
  });
  return result;
};

const createForm = async(name, fields) => {
  const query = `INSERT INTO ${formsTable}(name, fields) VALUES($1, $2)`;
  const values = [name, fields];
  await dbHandler.executeQuery(query, values);
};

const getFormById = async id => {
  const selectFieldsQuery = `SELECT * from ${formsTable} where id = ($1)`;
  const form = await dbHandler.executeQuery(selectFieldsQuery, [id]);
  return form.rows[0];
};

const submitForm = async(id, data) => {
  const query = `INSERT into ${submitTable}(id,submit,time) VALUES ($1,$2,$3)`;
  const values = [id, data, new Date().toUTCString()];
  await dbHandler.executeQuery(query, values);
};

const strCapitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const getFormColumns = async id => {
  const form = await getFormById(id);
  return form.fields.map(e => ({ field: e.inputName, header: strCapitalize(e.inputName) }));
};
const getFormSubmitsById = async id => {
  const submitsQuery = `SELECT * from ${submitTable} where id = ($1)`;
  const [submits, columns] = await Promise.all([
    dbHandler.executeQuery(submitsQuery, [id]),
    getFormColumns(id),
  ]);

  columns.push({ field: 'time', header: 'Time' });

  const rows = submits.rows.map(e => {
    const row = { ...e.submit };
    row.time = e.time;
    return row;
  });

  return { name: '', rows, columns };
};

module.exports = {
  getFormById,
  getForms,
  createForm,
  submitForm,
  getFormSubmitsById,
};
