import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'

import s from './nav.less'

@observer
class Nav extends React.Component {

	@observable _$scrolled = false

	_scrollTimeout = null

	componentWillMount() {
		document.addEventListener('scroll', this._onScrollThrottle)

		this._onScroll()
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this._onScrollThrottle)
	}

	render() {
		return (
			<nav className={[s.nav, this._$scrolled ? s.scrolled : ''].join(' ')}>
				<div className={s.logo} />
				<div className={s.buttons}>{this.props.children}</div>
			</nav>
		)
	}

	_onScrollThrottle = () => {
		if (!this._scrollTimeout) {
			this._scrollTimeout = 1
			setTimeout(this._onScroll, 50)
		}
	}

	@action
	_onScroll = () => {
		this._$scrolled = window.scrollY > 0
		this._scrollTimeout = null
	}

}

export default Nav
