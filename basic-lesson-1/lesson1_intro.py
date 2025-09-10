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

# Basic array creation
basic_array = np.array([1, 2, 3, 4, 5])
print('Basic array:', basic_array)
print('Array type:', type(basic_array))
print('Element type:', basic_array.dtype)
print('Array shape:', basic_array.shape)
print('Array dimensions:', basic_array.ndim)
print('Array size:', basic_array.size)

print('\nDifferent dimensional arrays:')
# 1D array
arr_1d = np.array([1, 2, 3])
print(f'1D array: {arr_1d} | ndim: {arr_1d.ndim} | shape: {arr_1d.shape}')

# 2D array
arr_2d = np.array([[1, 2, 3], [4, 5, 6]])
print(f'2D array:\n{arr_2d}')
print(f'ndim: {arr_2d.ndim} | shape: {arr_2d.shape}')

# 3D array
arr_3d = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
print(f'3D array:\n{arr_3d}')
print(f'ndim: {arr_3d.ndim} | shape: {arr_3d.shape}')

print("""
Next lessons:
- lesson2_creation_comparison.py: List vs NumPy creation speed
- lesson3_python_methods.py: Different Python multiplication methods
- lesson4_numpy_vectorization.py: NumPy vectorization power
- lesson5_performance_comparison.py: Complete performance analysis
""")