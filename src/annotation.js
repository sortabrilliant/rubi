/**
 * WordPress dependencies
 */
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import icon from './icon';
import AnnotationPopover from './annotation-popover';

export default function Annotation( { isActive, value, onChange } ) {
	const [ addingAnnotation, setAddingAnnotation ] = useState( false );

	const stopAddingAnnotation = () => {
		setAddingAnnotation( false );
	};

	return (
		<>
			{ ! isActive && window.getSelection().type === 'Range' && (
				<RichTextToolbarButton
					icon={ icon }
					title={ __( 'Add Ruby character(s)', 'rubi' ) }
					onClick={ () => setAddingAnnotation( true ) }
					isActive={ isActive }
				/>
			) }
			<AnnotationPopover
				key={ isActive }
				isActive={ isActive }
				addingAnnotation={ addingAnnotation }
				stopAddingAnnotation={ stopAddingAnnotation }
				value={ value }
				onChange={ onChange }
			/>
		</>
	);
}
