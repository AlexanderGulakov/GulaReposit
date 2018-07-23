
import React, {Fragment} from 'react';

/*class Button extends Component {
  render() {
    const { title, className, onClick } = this.props;
    return (
      <button
        className={className}
        onClick={onClick}
      >
        {title}
      </button>
    );
  }
}*/

// export default Button;

export default function ({title, className, onClick}) {
    // const { title, className, onClick } = props;
    return (
        <Fragment>
            <button className={className} onClick={onClick}>
                {title}
            </button>
        </Fragment>
    );
}