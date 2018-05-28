import React, {Component} from 'react';

// class Button extends Component {
//     render() {//обовязковий метод
//         const {title, className, onClick} = this.props;
//         return (
//             <button
//             className={className}
//             onClick={onClick}
//             >
//                 {title}
//             </button>
//         );
//     }
// }
//
// export default Button;
export default function ({title,className,onClick}) {
   // const {title, className, onClick}=props;
    return (
            <button
            className={className}
            onClick={onClick}
            >
                {title}
            </button>
        );
}