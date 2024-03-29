import React from 'react';
import {render} from '../src';
import {Demo} from './demo';

// function Demo() {
//
//     const [locale, setLocale] = useState('en');
//
//     return (
//         <div>
//             <Demo />
//
//
//             {/*<CommonTimePicker locale={locale} value={dayjs()} />*/}
//             {/*<CommonDateTimePicker  locale={locale} value={dayjs()} />*/}
//
//             {/*<button onClick={() => { setLocale('en'); }}>EN</button>*/}
//             {/*<button onClick={() => { setLocale('de'); }}>DE</button>*/}
//             {/*<button onClick={() => { setLocale('vi'); }}>VI</button>*/}
//             {/*<button onClick={() => { setLocale('ja'); }}>JA</button>*/}
//         </div>
//     );
// }

render(<Demo />);

