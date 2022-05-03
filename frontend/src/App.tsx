import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props: any): JSX.Element {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
};

const high = 67
const medium = 34
const low = 0

const getColor = (s: number) => {
    if (s >= high) {
        return "success"
    } else if (s >= medium) {
        return "warning"
    } else if (s > low) {
        return "error"
    }
    return "secondary"
}

export default function CircularStatic() {
    const Total = 80
    const [progress, setProgress] = React.useState(0);
    const [color, setColor] = React.useState('error')

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= Total ? Total : prevProgress + 10));
            setColor(getColor(progress))
        }, 50);
        return () => { clearInterval(timer); };
    }, [progress]);

    return <CircularProgressWithLabel color={color} value={progress} />;
}