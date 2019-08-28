export default () => {
  const colors = [
    {
      light: '#fafafa',
      dark: '#db5461',
      snake: '#000'
    },
    {
      light: '#e8eddf',
      dark: '#f5cb5c',
      snake: '#242423'
    },
    {
      light: '#f4f4f8',
      dark: '#9ee493',
      snake: '#000'
    },
    {
      light: '#fae3c6',
      dark: '#fe938c',
      snake: '#000'
    },
    {
      light: '#f0f3f5',
      dark: '#d7c9aa',
      snake: '#000'
    },
    {
      light: '#e8eef2',
      dark: '#68edc6',
      snake: '#000'
    },

    {
      light: '#f4f4f8',
      dark: '#2AB7CA',
      snake: '#0a090c'
    }
  ];

  const i = Math.floor(Math.random() * 7);

  return colors[i];
}