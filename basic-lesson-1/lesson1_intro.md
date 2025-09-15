# NumPy Introduction - Lesson 1

## Overview
This documentation explains the basic NumPy array creation methods demonstrated in `lesson1_intro.py` and their outputs.

## What is NumPy?
- **NumPy** = Numerical Python
- Foundation for scientific computing in Python
- Provides powerful N-dimensional array objects
- Fast operations implemented in C

## Why Use NumPy?
✅ **Performance**: 10-100x faster than pure Python
✅ **Memory efficient**: Less RAM usage
✅ **Vectorization**: No explicit loops needed
✅ **Broadcasting**: Operations on different shaped arrays
✅ **Ecosystem**: Foundation for pandas, scikit-learn, matplotlib

## Array Creation Methods

### 1. Basic Array Creation
```python
basic_array = np.array([1, 2, 3, 4, 5])
```
**Result:**
```
Basic array: [1 2 3 4 5]
Array type: <class 'numpy.ndarray'>
Element type: int64
Array shape: (5,)
Array dimensions: 1
Array size: 5
```

### 2. 1D Array Creation
```python
arr_1d = np.array([1, 2, 3])
```
**Result:**
```
1D array: [1 2 3] | ndim: 1 | shape: (3,)
```

### 3. 2D Array Creation
```python
arr_2d = np.array([[1, 2, 3], [4, 5, 6]])
```
**Result:**
```
2D array:
[[1 2 3]
 [4 5 6]]
ndim: 2 | shape: (2, 3)
```

### 4. 3D Array Creation
```python
arr_3d = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
```
**Result:**
```
3D array:
[[[1 2]
  [3 4]]

 [[5 6]
  [7 8]]]
ndim: 3 | shape: (2, 2, 2)
```

## Array Properties

| Property | Description | Example Output |
|----------|-------------|----------------|
| `type()` | Shows the array class type | `<class 'numpy.ndarray'>` |
| `.dtype` | Shows the data type of elements | `int64` |
| `.shape` | Shows the dimensions as a tuple | `(5,)`, `(2, 3)`, `(2, 2, 2)` |
| `.ndim` | Shows number of dimensions | `1`, `2`, `3` |
| `.size` | Shows total number of elements | `5`, `6`, `8` |

## Key Concepts

### Shape
- 1D array `[1, 2, 3]` has shape `(3,)` - 3 elements
- 2D array with 2 rows, 3 columns has shape `(2, 3)`
- 3D array with 2 blocks, 2 rows, 2 columns has shape `(2, 2, 2)`

### Dimensions (ndim)
- 1D: Single list of elements
- 2D: Matrix (rows and columns)
- 3D: Multiple matrices stacked together

### Size
Total number of elements in the array, calculated as the product of all dimensions.

## Next Steps
Continue with additional lessons to explore:
- Array creation performance comparisons
- Python vs NumPy multiplication methods
- Vectorization capabilities
- Complete performance analysis
- Memory usage comparisons