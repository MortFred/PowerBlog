#### Ouptut filters

We can smooth out the output of the rectifier by adding a filters to the output of the circuit.
First, lets add a simple capacitor to the output, as depicted in the figure below.
The transfer function between the source current and the load current is:

$$
\frac{I_{out}(s)}{I_{source}(s)} = H(s) =  \frac{1}{1 + s C_f R_l}
$$

which translates to the output signal:

$$
I_{out}(s) = H(s)I_{source}(s) =  \frac{1}{1 + s C_f R_l}\cdot \frac{1}{s^2 + \omega^2}
$$

where

$$
I_{source}(s) = \frac{1}{s^2 + \omega^2}
$$

is the Laplace representation of a sine wave with frequency $\omega = 2\pi f$.

The time domain differential equation for this expression can be found using the [inverse Fourier transform](https://www.wolframalpha.com/input?i=inverse+laplace+transform&assumption=%7B%22F%22%2C+%22InverseLaplaceTransformCalculator%22%2C+%22transformfunction%22%7D+-%3E%22%281%2F%281%2B+s*C*R%29%29+*+%281%2F%28s%5E2+%2B+w%5E2%29%29%22&assumption=%7B%22F%22%2C+%22InverseLaplaceTransformCalculator%22%2C+%22variable1%22%7D+-%3E%22s%22&assumption=%7B%22C%22%2C+%22inverse+laplace+transform%22%7D+-%3E+%7B%22Calculator%22%2C+%22dflt%22%7D&assumption=%7B%22F%22%2C+%22InverseLaplaceTransformCalculator%22%2C+%22variable2%22%7D+-%3E%22t%22), and is:

$$
i_{out}(t) = \frac{1}{C_f^2R_l^2\omega^2 + 1}(C_fR_le^{-t/CR} + \frac{1}{\omega}\sin(t\omega) - C_fR_l\cos(t\omega))
$$

For large values of $t$, the exponential component can be neglected, and we end up with the time-domain expression:

$$
i_{out}(t) = \frac{1}{C_f^2R_l^2\omega^2 + 1}(\frac{1}{\omega}\sin(t\omega) - C_fR_l\cos(t\omega))
$$
