import { initialize, updateRates } from './exchanges.js';

document.addEventListener('load', initialize());
document.getElementById('submit-button').addEventListener('click', updateRates);
