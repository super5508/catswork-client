import React from 'react'

import styles from './loading.less'

class Loading extends React.Component {

	_timeout = undefined

	state = { hidden: true }

	componentDidMount() {
		this._timeout = setTimeout(() => {
			this.setState({ hidden: false })
		}, 500)
	}

	componentWillUnmount() {
		clearTimeout(this._timeout)
	}

	render() {
		return this.state.hidden && this.props.delay
			? null
			: (
				<div className={styles.loading}>
					<div className={[styles.dot, styles.grow].join(' ')} />
					<div className={[styles.dot, styles.growInverse].join(' ')} />
					<div className={[styles.dot, styles.grow].join(' ')} />
				</div>
			)
	}

}

export default Loading

