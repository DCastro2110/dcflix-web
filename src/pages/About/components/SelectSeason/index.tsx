import { Dispatch, SetStateAction, useMemo } from 'react';
import Select, { SingleValue } from 'react-select';

interface ISeasonOptions {
  value: string;
  label: string;
}
interface IProps {
  seasonSelector: {
    seasonSelected: number;
    setSeasonSelected: Dispatch<SetStateAction<number>>;
  };
  seasonOptions: ISeasonOptions[];
}

export function SelectSeason({
  seasonOptions,
  seasonSelector: { seasonSelected, setSeasonSelected },
}: IProps) {
  const seasonValue = useMemo(() => {
    const [value] = seasonOptions.filter((item) =>
      item.label.includes(String(seasonSelected))
    );

    return value;
  }, [seasonSelected]);

  const changeSeasonSelected = (newValue: SingleValue<ISeasonOptions>) => {
    if (newValue === null) return;

    const [, seasonNumber] = newValue.label.split(' ');
    setSeasonSelected(Number(seasonNumber));
  };

  return (
    <Select
      options={seasonOptions}
      defaultValue={seasonValue}
      value={seasonValue}
      styles={{
        control: () => ({
          backgroundColor: '#0A1641',
          borderRadius: '0.375rem',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          marginBottom: '1rem',
          width: '100%',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        input: () => ({
          display: 'none',
        }),
        menu: () => ({
          backgroundColor: '#0A1641',
          borderRadius: '0.375rem',
          marginTop: '.3rem',
          padding: '.5rem',
          position: 'absolute',
          width: '100%',
          zIndex: '100',
        }),
        placeholder: () => ({
          color: 'rgba(255, 255, 255, 0.5)',
        }),
        option: (baseStyles, state) => ({
          'color': state.isSelected ? '#CD8605' : '#fff',
          'cursor': 'pointer',
          ':hover': {
            color: '#CD8605',
          },
        }),
        singleValue: () => ({
          color: '#fff',
        }),
      }}
      onChange={changeSeasonSelected}
    />
  );
}
