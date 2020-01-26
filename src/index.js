/**
 * WordPress dependencies
 */
import { registerFormatType } from '@wordpress/rich-text';

/**
 * Internal dependencies
 */
import Annotation from './annotation';

export const name = 'sortabrilliant/rubi';

registerFormatType( name, {
	tagName: 'span',
	className: 'rubi',
	title: 'Ruby',
	edit: Annotation,
} );

registerFormatType( `${ name }-rt`, {
	title: 'RubyText',
	tagName: 'rt',
	className: null,
} );
