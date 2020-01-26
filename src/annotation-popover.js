/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo, useState } from '@wordpress/element';
import { Popover, IconButton } from '@wordpress/components';
import { create, insert, getTextContent, slice } from '@wordpress/rich-text';
import { getRectangleFromRange } from '@wordpress/dom';

const PopoverAtRubyElement = ( { isActive, value, ...props } ) => {
	const anchorRect = useMemo( () => {
		const selection = window.getSelection();

		if ( ! selection.rangeCount ) {
			return;
		}

		const range = selection.getRangeAt( 0 );

		if ( ! range ) {
			return;
		}

		return getRectangleFromRange( range );
	}, [ isActive, value.start, value.end ] );

	if ( ! anchorRect ) {
		return null;
	}

	return <Popover anchorRect={ anchorRect } { ...props } />;
};

export default function AnnotationPopover( {
	isActive,
	value,
	addingAnnotation,
	stopAddingAnnotation,
	onChange,
	onFocus,
} ) {
	const [ annotation, setAnnotation ] = useState( '' );

	const createAnnotation = ( text, annotationValue ) =>
		`<ruby>${ text }<rt>${ annotationValue }</rt></ruby>`;

	const updateAnnotation = ( event ) => {
		event.preventDefault();

		const text = getTextContent( slice( value ) );

		if ( ! text || ! annotation ) {
			return;
		}

		const footnote = create( {
			html: createAnnotation( text, annotation ),
		} );

		onChange( insert( value, footnote ) );
	};

	if ( ! addingAnnotation ) {
		return null;
	}

	return (
		<PopoverAtRubyElement
			value={ value }
			isActive={ isActive }
			headerTitle={ __( 'Add Ruby character(s)', 'rubi' ) }
			position={ 'bottom center' }
			focusOnMount={ 'firstElement' }
			onClose={ () => {
				setAnnotation( '' );
				stopAddingAnnotation();
			} }
			onFocus={ onFocus }
		>
			<form className="sortabrilliant-rubi" onSubmit={ updateAnnotation }>
				<input
					type="text"
					value={ annotation }
					placeholder={ __( 'Add Ruby character(s)', 'rubi' ) }
					onChange={ ( event ) =>
						setAnnotation( event.target.value )
					}
				/>
				<IconButton
					icon="editor-break"
					label={ __( 'Apply', 'rubi' ) }
					type="submit"
				/>
			</form>
		</PopoverAtRubyElement>
	);
}
