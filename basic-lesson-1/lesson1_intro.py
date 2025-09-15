import numpy as np

print('='*50)
print('LESSON 1: NUMPY INTRODUCTION')
print('='*50)

print('NumPy version:', np.__version__)

print("""
What is NumPy?
- NumPy = Numerical Python
- Foundation for scientific computing in Python
- Provides powerful N-dimensional array objects
- Fast operations implemented in C

Why NumPy?
✅ Performance: 10-100x faster than pure Python
✅ Memory efficient: Less RAM usage
✅ Vectorization: No explicit loops needed
✅ Broadcasting: Operations on different shaped arrays
✅ Ecosystem: Foundation for pandas, scikit-learn, matplotlib

Basic NumPy array:
""")

# Basic array creation - creates a 1D array from a Python list
basic_array = np.array([1, 2, 3, 4, 5])
print('Basic array:', basic_array)
print('Array type:', type(basic_array))  # Shows it's a numpy.ndarray object
print('Element type:', basic_array.dtype)  # Data type of array elements (int64, float64, etc.)
print('Array shape:', basic_array.shape)  # Tuple showing dimensions (5,) means 5 elements in 1D
print('Array dimensions:', basic_array.ndim)  # Number of dimensions (1 for this array)
print('Array size:', basic_array.size)  # Total number of elements

print('\nDifferent dimensional arrays:')
# 1D array - single dimension array (vector)
arr_1d = np.array([1, 2, 3])
print(f'1D array: {arr_1d} | ndim: {arr_1d.ndim} | shape: {arr_1d.shape}')

# 2D array - two dimensions array (matrix: rows and columns)
arr_2d = np.array([[1, 2, 3], [4, 5, 6]])
print(f'2D array:\n{arr_2d}')
print(f'ndim: {arr_2d.ndim} | shape: {arr_2d.shape}')  # shape (2, 3) = 2 rows, 3 columns

# 3D array - three dimensions array (like multiple matrices stacked)
arr_3d = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
print(f'3D array:\n{arr_3d}')
print(f'ndim: {arr_3d.ndim} | shape: {arr_3d.shape}')  # shape (2, 2, 2) = 2 blocks, 2 rows, 2 columns

print('\nArray memory layout - Strides and Flags:')
# Strides - bytes to step in each dimension when traversing the array
print(f'2D array strides: {arr_2d.strides}')  # Shows memory jumps needed for each dimension
print(f'3D array strides: {arr_3d.strides}')  # Helps understand memory layout

# Flags - array memory layout and properties information
print(f'\n2D array flags:')
print(f'  C_CONTIGUOUS: {arr_2d.flags.c_contiguous}')  # Row-major (C-style) order - faster row access
print(f'  F_CONTIGUOUS: {arr_2d.flags.f_contiguous}')  # Column-major (Fortran-style) order - faster column access
print(f'  OWNDATA: {arr_2d.flags.owndata}')  # Array owns the memory it uses (not a view)
print(f'  WRITEABLE: {arr_2d.flags.writeable}')  # Array data can be modified

print('\nLESSON 6: Memory Efficiency Demonstration')
print('-' * 40)

# Quick memory comparison demonstration
import sys

# Compare memory usage of Python list vs NumPy array
size = 10000
python_list = list(range(size))  # Python list with integers
numpy_array = np.arange(size, dtype=np.int64)  # NumPy array with same integers

# Calculate memory usage
list_memory_mb = sys.getsizeof(python_list) / 1024 / 1024  # Convert to MB
array_memory_mb = numpy_array.nbytes / 1024 / 1024  # Convert to MB

print(f'Memory comparison for {size:,} integers:')
print(f'  Python list: {list_memory_mb:.3f} MB')
print(f'  NumPy array: {array_memory_mb:.3f} MB')
print(f'  Memory savings: {((list_memory_mb - array_memory_mb) / list_memory_mb * 100):.1f}%')
print(f'  NumPy is {list_memory_mb / array_memory_mb:.1f}x more memory efficient')

# Show bytes per element
print(f'\nBytes per element:')
print(f'  Python list: ~{sys.getsizeof(python_list) / size:.1f} bytes/element')
print(f'  NumPy array: {numpy_array.itemsize} bytes/element')

print("""
Next lessons:
- lesson2_creation_comparison.py: List vs NumPy creation speed
- lesson3_python_methods.py: Different Python multiplication methods
- lesson4_numpy_vectorization.py: NumPy vectorization power
- lesson5_performance_comparison.py: Complete performance analysis
- lesson6_memory_comparison.py: Detailed memory usage comparison between lists and arrays
""")