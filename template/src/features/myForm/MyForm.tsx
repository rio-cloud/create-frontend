import { useForm, Controller } from 'react-hook-form';
import Select from '@rio-cloud/rio-uikit/Select';
import ClearableInput from '@rio-cloud/rio-uikit/ClearableInput';

type SelectOptionType = {
    label: string;
    id: string;
    selected?: boolean;
};

type FormData = {
    name: string;
    email: string;
    formOfAddressId: string;
};

const formOfAddressOptions = [
    { id: 'mr', label: 'Mr.' },
    { id: 'ms', label: 'Ms.' },
];

const MyForm = () => {
    const {
        register,
        handleSubmit,
        control,
        trigger,
        formState: { errors, isDirty },
    } = useForm<FormData>({ mode: 'onSubmit' });

    const onSubmit = (data: FormData) => console.log(data);

    const getFormOfAddressOptions = (selectedValue: string) =>
        formOfAddressOptions.map(
            (item: SelectOptionType): SelectOptionType => ({
                ...item,
                selected: item.id === selectedValue,
            })
        );

    return (
        <div className="margin-auto max-width-400">
            <div className="text-size-h3 margin-bottom-15">Form Example</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Example for UIKIT select component */}
                <div className="form-group">
                    <label>Form of address</label>
                    <Controller
                        name="formOfAddressId"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                placeholder="Please select..."
                                options={getFormOfAddressOptions(value)}
                                onChange={(selectedOption: SelectOptionType) => onChange(selectedOption.id)}
                            />
                        )}
                    />
                </div>

                {/* Example for required UIKIT input component */}
                <div className={`form-group ${errors.name ? 'has-feedback has-error' : ''}`}>
                    <label className="control-label">Name*</label>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <ClearableInput placeholder="John Doe" {...field} />}
                    />
                    {errors.name && (
                        <>
                            <span className="form-control-feedback rioglyph rioglyph-error-sign" />
                            <span className="help-block">
                                <span>Name is required</span>
                            </span>
                        </>
                    )}
                </div>

                {/* Example for native required input with pattern that requires another field to be set */}
                <div className={`form-group ${errors.email ? 'has-feedback has-error' : ''}`}>
                    <label className="control-label">E-Mail*</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="john.doe@rio.cloud"
                        {...register('email', {
                            required: true,
                            pattern: /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/i,
                        })}
                        onChange={() =>
                            // Optional: triggers validation of the name input as a related/dependant input
                            trigger('name')
                        }
                    />
                    {errors.email && (
                        <>
                            <span className="form-control-feedback rioglyph rioglyph-error-sign" />
                            <span className="help-block">
                                <span>E-Mail is not valid</span>
                            </span>
                        </>
                    )}
                </div>

                <div className="display-flex justify-content-end margin-top-25">
                    <button type="submit" className="btn btn-primary" disabled={!isDirty}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyForm;
