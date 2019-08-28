export default () => {
  const colors = [
    {
      light: '#fff',
      dark: '#54f2f2',
      snake: '#1b4965'
    },
    {
      light: '#fcfcfc',
      dark: '#ff6b6b',
      snake: '#292f36'
    },
    {
      light: '#daf7dc',
      dark: '#9ee493',
      snake: '#2f4858'
    },
    {
      light: '#fdfffc',
      dark: '#d7263d',
      snake: '02182b'
    },
    {
      light: '#fdfffc',
      dark: '#68edc6',
      snake: '#235789'
    },
    {
      light: '#e8eddf',
      dark: '#f5cb5c',
      snake: '#242423'
    },
    {
      light: '#d9d0de',
      dark: '#a04668',
      snake: '#0c1713'
    }
  ];

  const i = Math.floor(Math.random() * 7);

  return colors[i];
}