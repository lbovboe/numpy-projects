import numpy as np

print('numpy version :',np.__version__)

# --------- python way -------
my_list = [1,2,3,4]
my_list = my_list * 2 # it will become  [1,2,3,4,1,2,3,4] which is not optimal
print('Python way multiply by 2 : ', my_list)



# -------- end of python way --------

l = np.array([1,2,3,4])
l = l * 2
print('Numpy way multiply by 2 :',l) # [2 4 6 8]