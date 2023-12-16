import { Report } from 'notiflix/build/notiflix-report-aio';
function onError(text) {
  Report.failure(
    `${text}`,
    'Please try again.',
    'Okay',
    {
      backgroundColor: ' rgba(207, 149, 129, 0.449) ',
      failure: {
        backOverlayColor: 'rgba(54, 50, 55, 0.696)',
        svgColor: '#8d230f',
        buttonBackground: '#8d230f',
      },
    }
  );
}
export default onError;