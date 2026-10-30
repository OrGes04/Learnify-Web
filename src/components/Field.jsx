function Field({ id, label, error, as = 'input', ...props }) {
    const Input = as;

    return (
        <>
            <label htmlFor={id}>{label}</label>
            <Input
                id={id}
                name={id}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                {...props}
            />
            {error && <p className="formerror" id={`${id}-error`}>{error}</p>}
        </>
    );
}

export default Field;
