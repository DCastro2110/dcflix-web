import Select from 'react-select';

interface IProps {
  seasonOptions: {
    value: string;
    label: string;
  }[];
}

export function SelectSeason({ seasonOptions }: IProps) {
  const [defaultSeason] = seasonOptions.filter(
    (item) => item.value === 'season1'
  );

  return (
    <Select
      options={seasonOptions}
      defaultValue={defaultSeason}
      styles={{
        control: () => ({
          backgroundColor: 'rgba(255, 255, 255, .3)',
          borderRadius: '0.375rem',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          width: '100%',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        input: () => ({
          display: 'none',
        }),
        menu: () => ({
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '0.375rem',
          marginTop: '.3rem',
          padding: '.5rem',
        }),
        placeholder: () => ({
          color: 'rgba(255, 255, 255, 0.5)',
        }),
        option: (baseStyles, state) => ({
          'color': state.isSelected ? '#080831' : '#fff',
          'cursor': 'pointer',
          ':hover': {
            color: '#080831',
          },
        }),
        singleValue: () => ({
          color: '#fff',
        }),
      }}
    />
  );
}
