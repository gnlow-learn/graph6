# graph6
- https://users.cecs.anu.edu.au/~bdm/data/formats.txt
- (unconventional) base 64 encoding
  - ASCII 63 `?` - ASCII 126 `~`
  - 6 bits = 1 char
- first char encodes order
  - `?`: $n=0$
  - `@`: $n=1$
  - `A`: $n=2$
  - ...
- rest chars encode lower triangular matrix
  - in this order
    ```
    _ _ _ _
    0 _ _ _
    1 2 _ _
    3 4 5 _
    ```
  - pad-right with 0
    ```
    101010 1111
    ->
    101010 111100
    ```
- example
  ```
  adjMat     order
  0 0 1 1 0  _ _ _ _ _
  0 0 0 1 1  0 _ _ _ _
  1 0 0 0 1  1 2 _ _ _
  1 1 0 0 0  3 4 5 _ _
  0 1 1 0 0  6 7 8 9 _

  010110 0110
  010110 011000
  U      W

  n=5 -> D

  DUW
  ```
