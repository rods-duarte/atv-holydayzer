import express from 'express';

const app = express();
const holidays = [ //! nao mudar
  { date: '1/1/2022', name: 'Confraternização mundial' },
  { date: '1/3/2022', name: 'Carnaval' },
  { date: '4/17/2022', name: 'Páscoa' },
  { date: '4/21/2022', name: 'Tiradentes' },
  { date: '5/1/2022', name: 'Dia do trabalho' },
  { date: '6/16/2022', name: 'Corpus Christi' },
  { date: '9/7/2022', name: 'Independência do Brasil' },
  { date: '10/12/2022', name: 'Nossa Senhora Aparecida' },
  { date: '11/2/2022', name: 'Finados' },
  { date: '11/15/2022', name: 'Proclamação da República' },
  { date: '12/25/2022', name: 'Natal' },
];

app.get('/holidays', (req, res) => {
  const formatedHolidays = holidays.map((holiday) => {
    const dateArr = holiday.date.split('/');
    [dateArr[0], dateArr[1]] = [dateArr[1], dateArr[0]];
    return { ...holiday, date: dateArr.join('/') };
  });
  res.send(formatedHolidays);
});

app.get('/holidays/:month', (req, res) => {
  const { month } = req.params;

  const formatedHolidays = holidays.filter((holiday) => {
    const dateArr = holiday.date.split('/');
    return dateArr[0] == month; //eslint-disable-line
  }).map((holiday) => {
    const dateArr = holiday.date.split('/');
    [dateArr[0], dateArr[1]] = [dateArr[1], dateArr[0]];
    return { ...holiday, date: dateArr.join('/') };
  });

  res.send(formatedHolidays);
});

/* eslint-disable */
app.get('/is-today-holiday', (req, res) => {
  const today = new Date();
  for (const holiday of holidays) {
    if (holiday.date === today.toLocaleDateString()) {
      res.send(`Sim, hoje é ${holiday.name}`);
    }
  }
  res.send('Não, hoje não é feriado');
});

app.listen(5000, () => console.log('Servidor aberto na porta 5000 !'));
/* eslint-enable */
